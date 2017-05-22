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
    guard let (ssid, bssid) = ReadAccessPoint.infos() else {
      resolve("[]")
      return
    }
    // print("SSID=\(ssid) BSSID=\(bssid)")
    
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: [["ssid": ssid, "bssid": bssid]], options: [])
      let jsonStr = String(bytes: jsonData, encoding: .utf8)!
      resolve(jsonStr)
      return
    } catch (let e) {
      print(e)
    }
    resolve("[]")
  }
  
  class func infos() -> (ssid: String, mac: String)? {
      guard let cfas: NSArray = CNCopySupportedInterfaces() else {
      return nil
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
    return nil
  }
}
