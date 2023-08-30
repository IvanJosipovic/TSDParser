namespace TSDParser.Parsers
{
    internal class MethodParsers
    {
        /// <summary>
        /// myFunc(): void;
        /// myFunc(param: string): void;
        /// </summary>
        public static Parser<MethodSignature> MethodSignature =
            from comment in CommonParsers.Comment().Optional()
            from name in CommonParsers.Name.Token()
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
                    Comment = comment.GetOrDefault(),
                    Text = name
                },
                Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
                Type = type,
            };
    }
}
