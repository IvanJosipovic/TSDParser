namespace TSDParser.Parsers.Types;

internal class TypeAliasParsers
{
    /// <summary>
    /// export declare type EnumValue<E = any> = EnumCls<E>;
    /// </summary>
    public static Parser<TypeAliasDeclaration> TypeAliasDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from @export in Parse.String("export").Token().Optional()
        from @declare in Parse.String("declare").Token().Optional()

        from keyword in Parse.String("type").Token()

        from name in CommonParsers.Name.Token()

        from openBracket in Parse.Char('<').Token().Optional()
        from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
        from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

        from @equals in Parse.Char('=').Token()

        from return_type in TypeParsers.Type

        from semi_colon in Parse.Char(';').Token().Optional()

        select new TypeAliasDeclaration()
        {
            Name = new Identifier
            {
                Text = name
            },

            Modifiers = new List<Node>()
            {
                @export.IsDefined ? new ExportKeyword() : null,
                @declare.IsDefined ? new DeclareKeyword() : null,
            }.Where(x => x is not null).ToList(),
            TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null,
            Type = return_type,
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null
        };
}
