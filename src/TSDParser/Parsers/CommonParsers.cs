namespace TSDParser.Parsers;

internal class CommonParsers
{
    public static Parser<string> Name = Parse.Identifier(Parse.Or(Parse.Letter, Parse.Chars("_")), Parse.Or(Parse.LetterOrDigit, Parse.Chars("_"))).Except(Parse.WhiteSpace);

    public static Parser<Parameter> Parameter =
        from name in Name.Token()
        from nullable in Parse.Char('?').Optional()
        from colon in Parse.Char(':').Token()
            // FunctionType Params
        from open_bracket in Parse.Char('(').Token().Optional()
        from parameters in Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Where(x => open_bracket.IsDefined && x.Any()).Optional()
        from close_bracket in Parse.Char(')').Token().Where(x => open_bracket.IsDefined).Optional()
        from arrow in Parse.String("=>").Token().Where(x => open_bracket.IsDefined && x.Any()).Optional()

        from return_type in TypeParsers.Type
        select new Parameter()
        {
            Name = new Identifier() { Text = name },
            Type = arrow.IsDefined ? new FunctionType() { Type = return_type, Parameters = parameters.IsDefined ? parameters.Get().ToList() : null } : return_type,
            QuestionToken = nullable.IsDefined ? new QuestionToken() : null,
        };

    public static Parser<string> Comment()
    {
        return
            from comment in new CommentParser("//", "/*", "*/", "\r\n").AnyComment.Token()
            select comment.Trim()
                          .Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                          .Select(RemoveChars)
                          .Aggregate((x, y) => x + "\r\n" + y).Trim();

        static string RemoveChars(string line)
        {
            return line.Trim().TrimStart('*').TrimStart('~').Trim();
        }
    }

    /// <summary>
    /// T
    /// T extends IPlugin
    /// T extends IPlugin = IPlugin
    /// </summary>
    /// <returns></returns>
    public static Parser<TypeParameter> TypeParameter =
        from type in Name

        from keyword in Parse.String("extends").Token().Optional()

        from extended_type in TypeParsers.Type.Optional()

        from equal in Parse.Char('=').Token().Optional()

        from default_type in TypeParsers.Type.Optional()

        select new TypeParameter()
        {
            Name = new Identifier() { Text = type },
            Constraint = extended_type.IsDefined ? extended_type.Get() : null,
            Default = default_type.IsDefined ? default_type.Get() : null
        };
}
