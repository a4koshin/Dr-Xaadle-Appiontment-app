class UserModel {
  final String id;
  final String fullName;
  final String phone;
  final String? email;
  final String role;
  final String status;

  UserModel({
    required this.id,
    required this.fullName,
    required this.phone,
    this.email,
    required this.role,
    required this.status,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json["id"],
      fullName: json["fullName"],
      phone: json["phone"],
      email: json["email"],
      role: json["role"],
      status: json["status"],
    );
  }
}