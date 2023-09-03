namespace TSDParser.Parsers.Types;

internal class TypeParsers : TypeLiteralParsers
{
    public static Parser<Node> BasicTypes = ArrayTypeParsers.ArrayType
                                    .Or<Node>(Parse.String("void").Select(x => new VoidKeyword()))
                                    .Or(Parse.String("null").Select(x => new NullKeyword()))
                                    .Or(Parse.String("undefined").Select(x => new UndefinedKeyword()))
                                    .Or(Parse.String("number").Select(x => new NumberKeyword()))
                                    .Or(Parse.String("string").Select(x => new StringKeyword()))
                                    .Or(Parse.String("any").Select(x => new AnyKeyword()))
                                    .Or(Parse.String("boolean").Select(x => new BooleanKeyword()))
                                    .Or(GenericParsers.Generic)
                                    .Or(CommonParsers.Name.Select(x => new TypeReference() { TypeName = new Identifier() { Text = x } }));

    public static Parser<Node> Type = UnionParsers.Union
                                        .Or<Node>(IntersectionParsers.Intersection)
                                        .Or(KeyValuePair)
                                        .Or(TypeLiteral)
                                        .Or(FunctionTypeParsers.FunctionType)
                                        .Or(TypeOperatorParsers.TypeOperator)
                                        .Or(ConstructorTypeParsers.ConstructorType)
                                        .Or(TupleTypeParsers.TupleType)
                                        .Or(IndexedAccessTypeParser.IndexedAccessType)
                                        .Or(MappedTypeParsers.MappedType)
                                        .Or(BasicTypes);
}
