namespace TSDParser.Parsers.Types;

internal static class ArrayTypeParsers
{

    /// <summary>
    /// string[]
    /// </summary>
    public static Parser<ArrayType> ArrayType =
        from name in CommonParsers.Name
        from array in Parse.String("[]")
        select new ArrayType()
        {
            ElementType = TypeParsers.Type.Parse(name)
        };
}