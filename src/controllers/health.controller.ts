export abstract class HealthController {
  static async checkHealth() {
    return 'Service up and running';
  }
}
