namespace TSDParser.Parsers.Types;

internal static class FunctionTypeParsers
{
    /// <summary>
    /// Test<() => void>
    /// Test<(param: string) => void>
    /// </summary>
    public static Parser<TypeReference> FunctionType =
        from name in CommonParsers.Name
        from open_angle_bracket in Parse.Char('<').Token()

            // FunctionType Params
        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Optional().Token()
        from close_bracket in Parse.Char(')').Token()

        from arrow in Parse.String("=>").Token()

        from return_type in TypeParsers.Type

        from close_angle_bracket in Parse.Char('>').Token()
        select new TypeReference()
        {
            TypeName = new Identifier() { Text = name },
            TypeArguments = new List<Node>()
            {
            new FunctionType()
            {
                Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
                Type = return_type
            }
            }
        };
}