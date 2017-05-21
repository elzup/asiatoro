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
    let (ssid, bssid) = ("ssid", "bssid")
    print("SSID=\(ssid) BSSID=\(bssid)")
    
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: ["ssid": ssid, "bssid": bssid], options: [])
      print(jsonData)
      let jsonStr = String(bytes: jsonData, encoding: .utf8)!
      print(jsonStr)
      resolve(jsonStr)
      return
    } catch (let e) {
      print(e)
    }
    resolve("[]")
  }

}
