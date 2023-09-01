﻿namespace TSDParser.Parsers;

internal class FunctionParsers
{
    /// <summary>
    /// myFunc(): void;
    /// myFunc(param: string): void;
    /// </summary>
    public static Parser<FunctionDeclaration> FunctionDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from @export in Parse.String("export").Token().Optional()
        from @declare in Parse.String("declare").Token().Optional()
        from keyword in Parse.String("function").Token()

        from name in CommonParsers.Name.Token()

        from openBracket in Parse.Char('<').Token().Optional()
        from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
        from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Optional()
        from close_bracket in Parse.Char(')').Token()

        from colon2 in Parse.Char(':').Token()

        from type in TypeParsers.Type

        from semicolon in Parse.Char(';').Token().Optional()
        select new FunctionDeclaration
        {
            Name = new Identifier()
            {
                Comment = comment.GetOrDefault(),
                Text = name
            },
            Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
            Type = type,
            TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null,
            Modifiers = new List<Node>()
            {
                @export.IsDefined? new ExportKeyword() : null,
                @declare.IsDefined? new DeclareKeyword() : null,
            }.Where(x => x is not null).ToList()
        };
}
