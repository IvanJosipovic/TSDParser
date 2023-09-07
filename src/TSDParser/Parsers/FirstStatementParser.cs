namespace TSDParser.Parsers;

internal class FirstStatementParser
{
    /// <summary>
    /// export declare const variable: (values: string) => void;
    /// </summary>
    internal static Parser<FirstStatement> FirstStatement =
        from comment in CommonParsers.Comment().Optional()
        from @export in Parse.String("export").Token().Optional()
        from @declare in Parse.String("declare").Token().Optional()
        from @const in Parse.String("const").Token()

        from name in CommonParsers.Name.Token()
        from colon in Parse.Char(':')

        from open_bracket in Parse.Char('(').Token()
        from parameter in CommonParsers.Parameter
        from close_bracket in Parse.Char(')').Token()
        from arrow in Parse.String("=>").Token()

        from return_type in TypeParsers.Type
        from semiColon in Parse.Char(';').Optional()
        select new FirstStatement()
        {
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null,
            Modifiers = new List<Node>()
            {
                { export.IsDefined ? new ExportKeyword() : null },
                { declare.IsDefined ? new DeclareKeyword() : null }
            }.Where(x => x is not null).ToList(),
            DeclarationList = new VariableDeclarationList()
            {
                Declarations =  new List<VariableDeclaration>()
                {
                    new VariableDeclaration()
                    {
                        Name = new Identifier()
                        {
                            Text = name
                        },
                        Type = parameter
                    }
                }
            }
        };
}
