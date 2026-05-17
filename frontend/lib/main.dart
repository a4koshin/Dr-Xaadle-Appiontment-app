import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'app/routes/appPages.dart';
import 'app/routes/appRoutes.dart';
import 'app/theme/appTheme.dart';
import 'core/network/apiClient.dart';
import 'controllers/authController.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  ApiClient.init();

  Get.put(AuthController());

  runApp(const DrXaadleApp());
}

class DrXaadleApp extends StatelessWidget {
  const DrXaadleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Dr-Xaadle',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: AppRoutes.splash,
      getPages: AppPages.pages,
    );
  }
}
