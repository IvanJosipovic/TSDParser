namespace TSDParser.Parsers.Types;

internal class TypeLiteralParsers
{

    /// <summary>
    /// { unload?: (isAsync?: boolean) => T; }
    /// </summary>
    public static Parser<TypeLiteral> TypeLiteral =
        from open_bracket in Parse.Char('{').Token()
        from property in PropertyParsers.PropertySignature
        from close_bracket in Parse.Char('}').Token()
        select new TypeLiteral()
        {
            Members = new List<Node>()
            {
            property
            }
        };

    /// <summary>
    /// { [key: string]: number; }
    /// </summary>
    public static Parser<TypeLiteral> KeyValuePair =
        from open_bracket in Parse.Char('{').Token()

        from open_squar_bracket in Parse.Char('[').Token()
        from key_name in CommonParsers.Name
        from colon in Parse.Char(':').Token()
        from key_type_name in CommonParsers.Name
        from close_square_bracket in Parse.Char(']').Token()

        from colon2 in Parse.Char(':').Token()

        from return_name in CommonParsers.Name

        from semi_colon in Parse.Char(';').Token().Optional()
        from close_bracket in Parse.Char('}').Token()

        select new TypeLiteral()
        {
            Members = new List<Node>()
            {
            new IndexSignature()
            {
                Type = TypeParsers.Type.Parse(return_name),
                Parameters = new List<Parameter>()
                {
                    new Parameter()
                    {
                        Name = new Identifier() { Text = key_name },
                        Type = TypeParsers.Type.Parse(key_type_name)
                    }
                }
            }
            }
        };
}