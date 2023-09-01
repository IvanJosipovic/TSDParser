namespace TSDParser.Parsers
{
    internal class ClassParsers
    {
        public static Parser<Constructor> Constructor =
             from comment in CommonParsers.Comment().Optional()
             from export in Parse.String("constructor").Token().Optional()
             from open_bracket in Parse.Char('(').Token()
             from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Optional()
             from close_bracket in Parse.Char(')')
             from semiColon in Parse.Char(';').Optional()
             select new Constructor()
             {
                 Parameters = parameters.GetOrDefault().ToList()
             };

        /// <summary>
        /// export class SomeType {}
        /// export class SomeType extends One, Two, Three {}
        /// export class SomeType<T,T2> {}
        /// </summary>
        public static Parser<ClassDeclaration> ClassDeclaration =
            from comment in CommonParsers.Comment().Optional()
            from export in Parse.String("export").Token().Optional()
            from declare in Parse.String("declare").Token().Optional()
            from keyword in Parse.String("class").Token()
            from name in CommonParsers.Name.Token()

            from openBracket in Parse.Char('<').Token().Optional()
            from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
            from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

            from extends_token in Parse.Or(Parse.String("extends"), Parse.String("implements")).Token().Optional()
            from extends in CommonParsers.Name.Token().DelimitedBy(Parse.Char(',').Token()).Where(x => extends_token.IsDefined && x.Any()).Optional()

            from openBrace in Parse.Char('{').Token()
            from statements in PropertyParsers.PropertyDeclaration
                                .Or<Node>(MethodParsers.MethodDeclaration)
                                .Or<Node>(Constructor)
                                .Many()
                                .Optional()
            from closeBrace in Parse.Char('}').Token()
            select new ClassDeclaration
            {
                Name = new Identifier
                {
                    Comment = comment.GetOrDefault(),
                    Text = name
                },
                Members = new List<Node>(statements.GetOrDefault()),
                HeritageClauses = extends.IsDefined  ? new List<HeritageClause>()
                {
                    new HeritageClause()
                    {
                        Types = extends.Get().Select(x => new ExpressionWithTypeArguments(){ Expression = new Identifier { Text = x } }).ToList()
                    }
                } : null,
                Modifiers = new List<Node>()
                {
                    { export.IsDefined ? new ExportKeyword() : null },
                    { declare.IsDefined ? new DeclareKeyword() : null }
                }.Where(x => x is not null).ToList(),
                TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null
            };
    }
}
