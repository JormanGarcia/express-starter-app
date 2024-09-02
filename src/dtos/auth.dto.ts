import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignupRequestDTO {
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}

export class LoginResponseDTO {
  constructor(public token: string, public type: string = "Bearer") {}

}
