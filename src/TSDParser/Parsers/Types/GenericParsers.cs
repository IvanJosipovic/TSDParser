namespace TSDParser.Parsers.Types;

internal static class GenericParsers
{
    /// <summary>
    /// One<Two,Three>
    /// </summary>
    public static Parser<TypeReference> Generic =
        from name in CommonParsers.Name
            //from open_angle_bracket in Parse.Char('<').Token()
        from types in TypeParsers.Type.DelimitedBy(Parse.Char(',').Token()).Contained(Parse.Char('<').Token(), Parse.Char('>').Token())
            //from close_angle_bracket in Parse.Char('>').Token()
        select new TypeReference()
        {
            TypeName = new Identifier() { Text = name },
            TypeArguments = types.ToList()
        };
}