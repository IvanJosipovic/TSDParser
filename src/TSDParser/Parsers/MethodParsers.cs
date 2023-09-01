using System;

namespace TSDParser.Parsers;

internal class MethodParsers
{
    /// <summary>
    /// myFunc(): void;
    /// myFunc(param: string): void;
    /// </summary>
    public static Parser<MethodSignature> MethodSignature =
        from comment in CommonParsers.Comment().Optional()
        from name in CommonParsers.Name.Token()
        from nullable in Parse.Char('?').Token().Optional()

        from openBracket in Parse.Char('<').Token().Optional()
        from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
        from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Optional()
        from close_bracket in Parse.Char(')').Token()
        from colon2 in Parse.Char(':').Token()
        from type in TypeParsers.Type
        from semicolon in Parse.Char(';').Token().Optional()
        select new MethodSignature
        {
            Name = new Identifier()
            {
                Text = name
            },
            Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
            Type = type,
            TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null,
            QuestionToken = nullable.IsDefined ? new QuestionToken() : null,
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null
        };

    /// <summary>
    /// myFunc(): void;
    /// myFunc(param: string): void;
    /// </summary>
    public static Parser<MethodDeclaration> MethodDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from @static in Parse.String("static").Token().Optional()
        from @private in Parse.String("private").Token().Optional()
        from @protected in Parse.String("protected").Token().Optional()
        from @abstract in Parse.String("abstract").Token().Optional()

        from name in CommonParsers.Name.Token()
        from nullable in Parse.Char('?').Token().Optional()

        from openBracket in Parse.Char('<').Token().Optional()
        from typeParameters in CommonParsers.TypeParameter.Token().DelimitedBy(Parse.Char(',')).Where(x => openBracket.IsDefined && x.Any()).Optional()
        from closeBracket in Parse.Char('>').Token().Where(x => openBracket.IsDefined && x != '\0').Optional()

        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Optional()
        from close_bracket in Parse.Char(')').Token()
        from colon2 in Parse.Char(':').Token()
        from type in TypeParsers.Type
        from semicolon in Parse.Char(';').Token().Optional()
        select new MethodDeclaration
        {
            Name = new Identifier()
            {
                Text = name
            },
            Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
            Type = type,
            TypeParameters = typeParameters.IsDefined ? typeParameters.Get().ToList() : null,
            Modifiers = new List<Node>()
            {
                @static.IsDefined? new StaticKeyword() : null,
                @private.IsDefined? new PrivateKeyword() : null,
                @protected.IsDefined? new ProtectedKeyword() : null,
                @abstract.IsDefined? new FirstContextualKeyword() : null,
            }.Where(x => x is not null).ToList(),
            QuestionToken = nullable.IsDefined ? new QuestionToken() : null,
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null
        };
}
