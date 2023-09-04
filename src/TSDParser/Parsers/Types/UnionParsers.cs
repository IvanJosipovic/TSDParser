namespace TSDParser.Parsers.Types;

internal static class UnionParsers
{
    /// <summary>
    /// string | number
    /// </summary>
    public static Parser<UnionType> Union =
        from types in TypeParsers.BasicTypes
                                    .DelimitedBy(Parse.Char('|').Token())
                                    .Where(x => x.Count() > 1)
        select new UnionType()
        {
            Types = types.ToList()
        };
}