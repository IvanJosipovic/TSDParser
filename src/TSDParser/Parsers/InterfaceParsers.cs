namespace TSDParser.Parsers
{
    internal class InterfaceParsers
    {
        /// <summary>
        /// export interface SomeType {}
        /// export interface SomeType extends One, Two, Three {}
    /// </summary>
    public static Parser<InterfaceDeclaration> InterfaceDeclaration =
            from comment in CommonParsers.Comment().Optional()
            from _ in Parse.String("export interface").Token()
            from name in CommonParsers.Name.Token()

            from extends_token in Parse.String("extends").Token().Optional()
            from extends in CommonParsers.Name.Token().DelimitedBy(Parse.Char(',').Token()).Optional()

            from openBrace in Parse.Char('{').Token()
            from statements in PropertyParsers.PropertySignature
                                .Or<Node>(MethodParsers.MethodSignature)
                                .Many()
                                .Optional()
            from closeBrace in Parse.Char('}').Token()
            select new InterfaceDeclaration
            {
                Name = new Identifier
                {
                    Comment = comment.GetOrDefault(),
                    Text = name
                },
                Statements = new List<Node>(statements.GetOrDefault()),
                HeritageClauses = extends.IsDefined ? new List<HeritageClause>()
                {
                    new HeritageClause()
                    {
                        Types = extends.Get().Select(x => new ExpressionWithTypeArguments(){ Expression = new Identifier { Text = x } }).ToList()
                    }
                } : null

            };
    }
}
