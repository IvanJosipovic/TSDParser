namespace TSDParser.Parsers
{
    internal class PropertyParsers
    {
        /// <summary>
        /// name: string;
        /// name: (param: string) => void;
        /// </summary>
        public static Parser<PropertySignature> PropertySignature =
            from comment in CommonParsers.Comment().Optional()
            from @readonly in Parse.String("readonly").Token().Optional()
            from name in CommonParsers.Name.Token()
            from nullable in Parse.Char('?').Optional()
            from colon in Parse.Char(':').Token()

                // FunctionType Params
            from open_bracket in Parse.Char('(').Token().Optional()
            from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Where(x => open_bracket.IsDefined).Optional()
            from close_bracket in Parse.Char(')').Token().Where(x => open_bracket.IsDefined).Optional()
            from arrow in Parse.String("=>").Token().Where(x => open_bracket.IsDefined).Optional()

            from return_type in TypeParsers.Type
            from semicolon in Parse.Char(';').Token().Optional()
            select new PropertySignature
            {
                Name = new Identifier
                {
                    Comment = comment.GetOrDefault(),
                    Text = name
                },
                Type = arrow.IsDefined ? new FunctionType() { Type = return_type, Parameters = parameters.IsDefined ? parameters.Get().ToList() : null } : return_type,
                QuestionToken = nullable.IsDefined ? new QuestionToken() : null,
                Modifiers = @readonly.IsDefined ? new List<Node>() { new ReadonlyKeyword() } : null
            };
    }
}
