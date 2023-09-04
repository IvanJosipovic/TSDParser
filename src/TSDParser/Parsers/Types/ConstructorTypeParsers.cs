namespace TSDParser.Parsers.Types;

internal static class ConstructorTypeParsers
{

    /// <summary>
    /// new () => T
    /// new (test: string) => T
    /// </summary>
    public static Parser<ConstructorType> ConstructorType =
        from keyword in Parse.String("new").Token()

            // FunctionType Params
        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Optional().Token()
        from close_bracket in Parse.Char(')').Token()

        from arrow in Parse.String("=>").Token()

        from return_type in TypeParsers.Type

        select new ConstructorType()
        {
            Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
            Type = return_type
        };
}