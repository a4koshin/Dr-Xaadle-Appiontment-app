import '../../core/network/apiClient.dart';
import '../../core/network/apiEndpoints.dart';

class AuthRepository {
  Future<Map<String, dynamic>> login({
    required String phone,
    required String password,
  }) async {
    final response = await ApiClient.dio.post(
      ApiEndpoints.login,
      data: {
        "phone": phone,
        "password": password,
      },
    );

    return response.data;
  }

  Future<Map<String, dynamic>> register({
    required String fullName,
    required String phone,
    required String email,
    required String password,
  }) async {
    final response = await ApiClient.dio.post(
      ApiEndpoints.register,
      data: {
        "fullName": fullName,
        "phone": phone,
        "email": email,
        "password": password,
      },
    );

    return response.data;
  }
}