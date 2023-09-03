using TSDParser.Parsers.Types;

namespace TSDParser.Parsers;

internal class TypeParsers
{
    /// <summary>
    /// One<Two,Three>
    /// </summary>
    public static Parser<TypeReference> Generic =
        from name in CommonParsers.Name
        from open_angle_bracket in Parse.Char('<').Token()
        from types in Type.DelimitedBy(Parse.Char(',').Token())
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

    /// <summary>
    /// { unload?: (isAsync?: boolean) => T; }
    /// </summary>
    public static Parser<Node> TypeLiteral =
        from open_bracket in Parse.Char('{').Token()
        from property in PropertyParsers.PropertySignature
        from close_bracket in Parse.Char('}').Token()
        select new TypeLiteral()
        {
            Members = new List<Node>()
            {
                property
            }
        };

    /// <summary>
    /// keyof T
    /// </summary>
    public static Parser<TypeOperator> TypoOperator =
        from keyword in Parse.String("keyof").Token()
        from type in Type
        select new TypeOperator()
        {
            Type = type
        };

    /// <summary>
    /// new () => T
    /// new (test: string) => T
    /// </summary>
    public static Parser<ConstructorType> ConstructorType =
        from keyword in Parse.String("new").Token()

        // FunctionType Params
        from open_bracket in Parse.Char('(').Token()
        from parameters in CommonParsers.Parameter.DelimitedBy(Parse.Char(',').Token()).Optional().Token()
        from close_bracket in Parse.Char(')').Token()

        from arrow in Parse.String("=>").Token()

        from return_type in Type

        select new ConstructorType()
        {
            Parameters = parameters.IsDefined ? parameters.Get().ToList(): null,
            Type = return_type
        };

    /// <summary>
    /// [T, V]
    /// </summary>
    public static Parser<TupleType> TupleType =
        from open_bracket in Parse.Char('[').Token()
        from type in Type
        from comma in Parse.Char(',').Token()
        from type2 in Type
        from close_bracket in Parse.Char(']').Token()

        select new TupleType()
        {
            Elements = new List<Node>()
            {
                type,
                type2
            }
        };

    /// <summary>
    /// V[T]
    /// </summary>
    public static Parser<IndexedAccessType> IndexedAccessType =
        from lookAhead_start in Parse.Chars("]").Preview()
        from lookAhead_end in Parse.Chars("]").Preview()

        from type in TypeParsers.Type.Where(x => lookAhead_start.IsDefined && lookAhead_end.IsDefined && x is not null)
        from open_bracket in Parse.Char('[').Token()
        from type2 in TypeParsers.Type
        from close_bracket in Parse.Char(']').Token()

        select new IndexedAccessType()
        {
            ObjectType = type,
            IndexType = type2
        };

    public static Parser<Node> TypesNoGrouping = ArrayType
                                    .Or(Parse.String("void").Select(x => new VoidKeyword()))
                                    .Or(Parse.String("null").Select(x => new NullKeyword()))
                                    .Or(Parse.String("undefined").Select(x => new UndefinedKeyword()))
                                    .Or(Parse.String("number").Select(x => new NumberKeyword()))
                                    .Or(Parse.String("string").Select(x => new StringKeyword()))
                                    .Or(Parse.String("any").Select(x => new AnyKeyword()))
                                    .Or(Parse.String("boolean").Select(x => new BooleanKeyword()))
                                    .Or(KeyValuePair)
                                    .Or(TypeLiteral)
                                    .Or(Generic)
                                    .Or(FunctionType)
                                    .Or(TypoOperator)
                                    .Or(ConstructorType)
                                    .Or(TupleType)
                                    .Or(IndexedAccessType)
                                    .Or(CommonParsers.Name.Select(x => new TypeReference() { TypeName = new Identifier() { Text = x } }));

    public static Parser<Node> Type = UnionParsers.Union
                                        .Or<Node>(IntersectionParsers.Intersection)
                                        .Or(TypesNoGrouping);
}
