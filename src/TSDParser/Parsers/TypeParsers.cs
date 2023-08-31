namespace TSDParser.Parsers
{
    internal class TypeParsers
    {
        /// <summary>
        /// One<Two,Three>
        /// </summary>
        public static Parser<TypeReference> Generic =
            from name in CommonParsers.Name
            from open_angle_bracket in Parse.Char('<').Token()
            from types in Type.DelimitedBy(Parse.Char(','))
            from close_angle_bracket in Parse.Char('>').Token()
            select new TypeReference()
            {
                TypeName = new Identifier() { Text = name },
                TypeArguments = types.ToList()
            };

        /// <summary>
        /// Test<() => void>
        /// Test<(param: string) => void>
        /// </summary>
        public static Parser<TypeReference> FunctionType =
            from name in CommonParsers.Name
            from open_angle_bracket in Parse.Char('<').Token()

            // FunctionType Params
            from open_bracket in Parse.Char('(').Token()
            from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Optional().Token()
            from close_bracket in Parse.Char(')').Token()

            from arrow in Parse.String("=>").Token()

            from return_type in Type

            from close_angle_bracket in Parse.Char('>').Token()
            select new TypeReference()
            {
                TypeName = new Identifier() { Text = name },
                TypeArguments = new List<Node>()
                {
                    new FunctionType()
                    {
                        Parameters = parameters.IsDefined ? parameters.Get().ToList() : null,
                        Type = return_type
                    }
                }
            };

        /// <summary>
        /// string[]
        /// </summary>
        public static Parser<Node> ArrayType =
            from name in CommonParsers.Name
            from array in Parse.String("[]")
            select new ArrayType()
            {
                ElementType = Type.Parse(name)
            };

        /// <summary>
        /// { [key: string]: number; }
        /// </summary>
        public static Parser<Node> KeyValuePair =
            from open_bracket in Parse.Char('{').Token()

            from open_squar_bracket in Parse.Char('[').Token()
            from key_name in CommonParsers.Name
            from colon in Parse.Char(':').Token()
            from key_type_name in CommonParsers.Name
            from close_square_bracket in Parse.Char(']').Token()

            from colon2 in Parse.Char(':').Token()

            from return_name in CommonParsers.Name

            from semi_colon in Parse.Char(';').Token().Optional()
            from close_bracket in Parse.Char('}').Token()

            select new TypeLiteral()
            {
                Members = new List<Node>()
                {
                    new IndexSignature()
                    {
                        Type = Type.Parse(return_name),
                        Parameters = new List<Parameter>()
                        {
                            new Parameter()
                            {
                                Name = new Identifier() { Text = key_name },
                                Type = Type.Parse(key_type_name)
                            }
                        }
                    }
                }
            };

        public static Parser<Node> Type = ArrayType
                                            .Or(Parse.String("void").Select(x => new VoidKeyword()))
                                            .Or(Parse.String("null").Select(x => new NullKeyword()))
                                            .Or(Parse.String("undefined").Select(x => new UndefinedKeyword()))
                                            .Or(Parse.String("number").Select(x => new NumberKeyword()))
                                            .Or(Parse.String("string").Select(x => new StringKeyword()))
                                            .Or(Parse.String("any").Select(x => new AnyKeyword()))
                                            .Or(Parse.String("boolean").Select(x => new BooleanKeyword()))
                                            .Or(KeyValuePair)
                                            .Or(Generic)
                                            .Or(FunctionType)
                                            .Or(CommonParsers.Name.Select(x => new TypeReference() { TypeName = new Identifier() { Text = x } }));
    }
}
