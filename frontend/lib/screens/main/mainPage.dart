import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/authController.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    final authController = Get.find<AuthController>();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Dr-Xaadle"),
        actions: [
          IconButton(
            onPressed: () => authController.logout(),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: const Center(
        child: Text("Home Page", style: TextStyle(fontSize: 24)),
      ),
    );
  }
}
