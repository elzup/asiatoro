//
//  ReadAccessPoint.swift
//  asiatoro
//
//  Created by Hiroto Takahashi on 2017/05/16.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

@objc(ReadAccessPoint)
class ReadAccessPoint: NSObject {
  
  @objc func getElzup(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve("elzup")
  }
  
}
