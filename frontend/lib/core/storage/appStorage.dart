import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AppStorage {
  static const _storage = FlutterSecureStorage();

  static const String tokenKey = "token";

  static Future<void> saveToken(String token) async {
    await _storage.write(key: tokenKey, value: token);
  }

  static Future<String?> getToken() async {
    return _storage.read(key: tokenKey);
  }

  static Future<void> removeToken() async {
    await _storage.delete(key: tokenKey);
  }
}
