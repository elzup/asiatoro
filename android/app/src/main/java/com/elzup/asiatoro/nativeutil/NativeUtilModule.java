package com.elzup.asiatoro.nativeutil;

import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.content.Context.WIFI_SERVICE;

public class NativeUtilModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public NativeUtilModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeUtilModuleAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";

    @ReactMethod
    public void getAccessPoints(Promise promise) {
        WifiManager manager = (WifiManager) (getReactApplicationContext().getApplicationContext().getSystemService(WIFI_SERVICE));
        if (manager.getWifiState() != WifiManager.WIFI_STATE_ENABLED) {
            promise.resolve(null);
            return;
        }
        manager.startScan();
        List<ScanResult> apList = manager.getScanResults();
        ArrayList<String> aps = new ArrayList<>();
        if (apList.size() == 0) {
            promise.resolve("AP not found");
            return;
        }
        for (ScanResult ap: apList) {
            aps.add(ap.SSID + "#" + ap.BSSID + "#" + ap.level);
        }

        StringBuilder buf = new StringBuilder();
        for (String str : aps) {
            // SSID に使えない記号
            buf.append(str).append("##");
        }
        String text = buf.substring(0, buf.length() - 1);
        try {
            promise.resolve(text);
        } catch (IllegalViewOperationException e) {
            promise.reject(E_LAYOUT_ERROR, e);
        }
    }
}
