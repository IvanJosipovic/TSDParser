namespace TSDParser.Parsers.Types;

internal static class TupleTypeParsers
{

    /// <summary>
    /// [T, V]
    /// </summary>
    public static Parser<TupleType> TupleType =
        from open_bracket in Parse.Char('[').Token()
        from type in TypeParsers.Type
        from comma in Parse.Char(',').Token()
        from type2 in TypeParsers.Type
        from close_bracket in Parse.Char(']').Token()

        select new TupleType()
        {
            Elements = new List<Node>()
            {
            type,
            type2
            }
        };
}