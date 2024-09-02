export class ResponseEntity {
  constructor(
    public data: any,
    public status = 500,
  ) {}
}
