namespace TSDParser.Parsers;

internal class ExportParsers
{
    public static Parser<ExportSpecifier> ExportSpecifier =
        from name in CommonParsers.Name
        from keyword in Parse.String("as").Token().Optional()
        from propertyName in CommonParsers.Name.Where(x => keyword.IsDefined && x.Any()).Optional()
        select new ExportSpecifier()
        {
            Name = propertyName.IsDefined ? new Identifier() { Text = propertyName.Get() } : new Identifier() { Text = name },
            PropertyName = propertyName.IsDefined ? new Identifier() { Text = name } : null
        };

    /// <summary>
    /// export { Class1 }
    /// export { Class1, Class2 }
    /// export { Class1 as Class2 }
    /// export { Class1 as Class2, Class3 as Class4 }
    /// </summary>
    public static Parser<ExportDeclaration> ExportDeclaration =
        from keyword in Parse.String("export").Token()
        from open_bracket in Parse.Char('{').Token()
        from exportSpecifiers in ExportSpecifier.DelimitedBy(Parse.Char(',').Token()).Optional()
        from close_bracket in Parse.Char('}').Token()
        select new ExportDeclaration()
        {
            ExportClause = new NamedExports()
            {
                Elements = exportSpecifiers.IsDefined ? new List<ExportSpecifier>(exportSpecifiers.Get()) : null
            }
        };
}
