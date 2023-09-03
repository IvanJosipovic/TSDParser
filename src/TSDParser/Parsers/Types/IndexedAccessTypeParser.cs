namespace TSDParser.Parsers.Types;

public static class IndexedAccessTypeParser
{
    /// <summary>
    /// V[T]
    /// </summary>
    public static Parser<IndexedAccessType> IndexedAccessType =
        from type in TypeParsers.BasicTypes
        from open_bracket in Parse.Char('[').Token()
        from type2 in TypeParsers.Type
        from close_bracket in Parse.Char(']').Token()
        select new IndexedAccessType()
        {
            ObjectType = type,
            IndexType = type2
        };
}