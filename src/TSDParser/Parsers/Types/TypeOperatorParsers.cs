namespace TSDParser.Parsers.Types;

internal static class TypeOperatorParsers
{

    /// <summary>
    /// keyof T
    /// </summary>
    public static Parser<TypeOperator> TypeOperator =
        from keyword in Parse.String("keyof").Token()
        from type in TypeParsers.BasicTypes
        select new TypeOperator()
        {
            Type = type
        };
}