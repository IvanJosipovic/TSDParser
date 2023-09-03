﻿namespace TSDParser.Parsers.Types;

internal static class IntersectionParsers
{
    /// <summary>
    /// string & number
    /// </summary>
    public static Parser<IntersectionType> Intersection =
        from types in TypeParsers.BasicTypes
                                    .DelimitedBy(Parse.Char('&').Token())
                                    .Where(x => x.Count() > 1)
        select new IntersectionType()
        {
            Types = types.ToList()
        };
}