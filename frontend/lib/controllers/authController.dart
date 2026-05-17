import 'package:get/get.dart';
import '../app/routes/appRoutes.dart';
import '../core/storage/appStorage.dart';
import '../data/models/userModel.dart';
import '../data/repositories/authRepository.dart';

class AuthController extends GetxController {
  final AuthRepository _authRepository = AuthRepository();

  RxBool isLoading = false.obs;
  Rxn<UserModel> user = Rxn<UserModel>();

  Future<void> checkAuth() async {
    await Future.delayed(const Duration(seconds: 2));

    final token = await AppStorage.getToken();

    if (token != null && token.isNotEmpty) {
      Get.offAllNamed(AppRoutes.main);
    } else {
      Get.offAllNamed(AppRoutes.login);
    }
  }

  Future<void> login(String phone, String password) async {
    try {
      isLoading.value = true;

      final result = await _authRepository.login(
        phone: phone,
        password: password,
      );

      final data = result["data"];
      final token = data["token"];
      final userData = data["user"];

      await AppStorage.saveToken(token);
      user.value = UserModel.fromJson(userData);

      Get.offAllNamed(AppRoutes.main);
    } catch (e) {
      Get.snackbar("Login Failed", "Invalid phone or password");
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> register(
    String fullName,
    String phone,
    String email,
    String password,
  ) async {
    try {
      isLoading.value = true;

      final result = await _authRepository.register(
        fullName: fullName,
        phone: phone,
        email: email,
        password: password,
      );

      final data = result["data"];
      final token = data["token"];
      final userData = data["user"];

      await AppStorage.saveToken(token);
      user.value = UserModel.fromJson(userData);

      Get.offAllNamed(AppRoutes.main);
    } catch (e) {
      Get.snackbar("Register Failed", "Please check your information");
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> logout() async {
    await AppStorage.removeToken();
    Get.offAllNamed(AppRoutes.login);
  }
}
