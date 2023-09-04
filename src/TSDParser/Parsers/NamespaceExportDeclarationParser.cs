namespace TSDParser.Parsers;

internal class NamespaceExportDeclarationParser
{
    /// <summary>
    /// export as namespace myLib;
    /// </summary>
    internal static Parser<NamespaceExportDeclaration> NamespaceExportDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from @export in Parse.String("export").Token()
        from @as in Parse.String("as").Token()
        from @namespace in Parse.String("namespace").Token()
        from name in CommonParsers.Name.Token()
        from semiColon in Parse.Char(';').Optional()
        select new NamespaceExportDeclaration()
        {
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null,
            Name = new Identifier()
            {
                Text = name
            }
        };
}
