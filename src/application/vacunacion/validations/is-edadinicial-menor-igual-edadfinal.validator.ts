import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isEdadinicialMenorigualQueEdadfinal',
  async: false,
})
export class isEdadinicialMenorigualQueEdadfinal
  implements ValidatorConstraintInterface
{
  validate(edadInicial: number, args: ValidationArguments) {
    const obj = args.object as any;
    return edadInicial <= obj.edadFinal;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Edad inicial debe ser menor o igual que Edad final';
  }
}
