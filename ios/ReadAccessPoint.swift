//
//  ReadAccessPoint.swift
//  asiatoro
//
//  Created by Hiroto Takahashi on 2017/05/16.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import NetworkExtension
import SystemConfiguration.CaptiveNetwork

@objc(ReadAccessPoint)
class ReadAccessPoint: NSObject {
  
  @objc(getAccessPoints:reject:)
  func getAccessPoints(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let (ssid, bssid) = ReadAccessPoint.infos()
    print("SSID=\(ssid) BSSID=\(bssid)")
    
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: [["ssid": ssid, "bssid": bssid]], options: [])
      let jsonStr = String(bytes: jsonData, encoding: .utf8)!
      print(jsonStr)
      resolve(jsonStr)
      return
    } catch (let e) {
      print(e)
    }
    resolve("[]")
  }
  
  class func infos() -> (ssid: String, mac: String) {
    print("infos")
    guard let cfas: NSArray = CNCopySupportedInterfaces() else {
      return ("unknown", "unknown")
    }
    for cfa in cfas {
      guard let dict = CFBridgingRetain(
        CNCopyCurrentNetworkInfo(cfa as! CFString)
        ) as? NSDictionary else {
          continue
      }
      guard let ssid = dict["SSID"] as? String,
        let mac = dict["BSSID"] as? String else {
          continue
      }
      return (ssid, mac)
    }
    return ("unknown", "unknown")
  }
}
