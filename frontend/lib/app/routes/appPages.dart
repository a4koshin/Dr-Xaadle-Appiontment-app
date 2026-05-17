import 'package:get/get.dart';

import '../../screens/splash/splashPage.dart';
import '../../screens/auth/loginPage.dart';
import '../../screens/auth/registerPage.dart';
import '../../screens/main/mainPage.dart';
import 'appRoutes.dart';

class AppPages {
  static final pages = [
    GetPage(name: AppRoutes.splash, page: () => const SplashPage()),
    GetPage(name: AppRoutes.login, page: () => const LoginPage()),
    GetPage(name: AppRoutes.register, page: () => const RegisterPage()),
    GetPage(name: AppRoutes.main, page: () => const MainPage()),
  ];
}
