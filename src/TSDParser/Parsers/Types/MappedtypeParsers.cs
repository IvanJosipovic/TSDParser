namespace TSDParser.Parsers.Types;

internal static class MappedTypeParsers
{
    /// <summary>
    /// { [key in keyof E]: E[keyof E];}
    /// { [key in keyof E]: E;}
    /// { [key in T]: E;}
    /// </summary>
    public static Parser<MappedType> MappedType =
        from open in Parse.Char('{').Token()

        from open_square in Parse.Char('[').Token()

        from name in CommonParsers.Name.Token()

        from @in in Parse.String("in").Token()

        from type in TypeParsers.Type

        from close_square in Parse.Char(']').Token()
        from colon in Parse.Char(':').Token()

        from type2 in TypeParsers.Type

        from semicolon in Parse.Char(';').Token().Optional()

        from close in Parse.Char('}').Token()
        select new MappedType()
        {
            TypeParameter = new TypeParameter()
            {
                Name = new Identifier()
                {
                    Text = name
                },
                Constraint = type
            },
            Type = type2
        };
}