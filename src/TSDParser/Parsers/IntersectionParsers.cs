namespace TSDParser.Parsers;

internal static class IntersectionParsers
{
    /// <summary>
    /// string & number
    /// </summary>
    public static Parser<IntersectionType> Intersection =
        from types in TypeParsers.TypesNoGrouping
                                    .DelimitedBy(Parse.Char('&').Token())
                                    .Where(x => x.Count() > 1)
        select new IntersectionType()
        {
            Types = types.ToList()
        };
}