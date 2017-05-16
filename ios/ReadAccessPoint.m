//
//  ReadAccessPoint.m
//  asiatoro
//
//  Created by Hiroto Takahashi on 2017/05/16.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReadAccessPoint, NSObject)

RCT_EXTERN_METHOD(getAlbums: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
