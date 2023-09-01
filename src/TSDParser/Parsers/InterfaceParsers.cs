namespace TSDParser.Parsers;

internal class InterfaceParsers
{
    /// <summary>
    /// export interface SomeType {}
    /// export interface SomeType extends One, Two, Three {}
    /// export interface SomeType<T,T2> {}
    /// </summary>
    public static Parser<InterfaceDeclaration> InterfaceDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from export in Parse.String("export").Token().Optional()
        from declare in Parse.String("declare").Token().Optional()
        from keyword in Parse.String("interface").Token()
        from name in CommonParsers.Name.Token()

        from openBracket in Parse.Char('<').Token().Optional()
        from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
        from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

        from extends_token in Parse.String("extends").Token().Optional()
        from extends in TypeParsers.Type.DelimitedBy(Parse.Char(',').Token()).Where(x => extends_token.IsDefined && x.Any()).Optional()

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
                Text = name
            },
            Statements = new List<Node>(statements.GetOrDefault()),
            HeritageClauses = extends.IsDefined ? new List<HeritageClause>()
            {
                new HeritageClause()
                {
                    Types = extends.Get().Select(x => new ExpressionWithTypeArguments()
                    {
                        Expression = new Identifier { Text = ((TypeReference)x).TypeName.Text },
                        TypeArguments =  ((TypeReference)x).TypeArguments
                    }).ToList()
                }
            } : null,
            Modifiers = new List<Node>()
            {
                { export.IsDefined ? new ExportKeyword() : null },
                { declare.IsDefined ? new DeclareKeyword() : null }
            }.Where(x => x is not null).ToList(),
            TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null,
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null
        };
}
