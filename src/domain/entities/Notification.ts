export class Notification {
  constructor(
    public readonly id: String,
    public readonly userId: String,
    public readonly message: String,
    public readonly status: "sent" | "pending" | "read",
    public readonly createdAt: Date = new Date()
  ) {}
}
