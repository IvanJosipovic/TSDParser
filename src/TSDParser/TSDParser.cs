using Sprache;
using System.Linq;
using TSDParser.Class;
using TSDParser.Class.Keywords;
using TSDParser.Interfaces;

namespace TSDParser
{
    public static class TSDParser
    {
        public static Parser<string> Name = Parse.Identifier(Parse.Or(Parse.Letter, Parse.Chars("_")), Parse.Or(Parse.LetterOrDigit, Parse.Chars("_"))).Except(Parse.WhiteSpace);

        public static Parser<string> ParseComment()
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

        public static Parser<ImportSpecifier> ImportSpecifier =
            from className in Name.Token()
            from keyword in Parse.String("as").Optional()
            from propertyName in Name.Token().Where(x => keyword.IsDefined).Optional()
            select new ImportSpecifier()
            {
                Name = propertyName.IsDefined ? new Identifier() { Text = propertyName.Get() } : new Identifier() { Text = className },
                PropertyName = propertyName.IsDefined ? new Identifier() { Text = className } : null
            };

        /// <summary>
        /// import { MyClass } from '@org/package';
        /// import { MyClass, MyClass2 } from '@org/package';
        /// import { MyClass as NewClass } from '@org/package';
        /// import { MyClass as NewClass, MyClass2 as NewClass2 } from '@org/package';
        /// </summary>
        public static Parser<ImportDeclaration> ImportDeclaration =
            from keyword in Parse.String("import").Token()

            from open_bracket in Parse.Char('{').Token()
            from importSpecifiers in ImportSpecifier.DelimitedBy(Parse.Char(','))
            from close_bracket in Parse.Char('}').Token()

            from keyword2 in Parse.String("from").Token()

            from package in Parse.AnyChar.Except(Parse.Chars("\'\"")).Many().Text().Token().Contained(Parse.Chars("\'\"").Token(), Parse.Chars("\'\"").Token())

            from semicolon in Parse.Char(';').Token().Optional()

            select new ImportDeclaration()
            {
                ImportClause = new ImportClause()
                {
                    NamedBindings = new List<NamedImports>()
                    {
                        new NamedImports()
                        {
                            Elements = new List<ImportSpecifier>(importSpecifiers)
                        }
                    }
                },
                ModuleSpecifier = new StringLiteral()
                {
                    Text = package
                }
            };

        /// <summary>
        /// export interface SomeType {}
        /// </summary>
        public static Parser<InterfaceDeclaration> InterfaceDeclaration =
            from comment in ParseComment().Optional()
            from _ in Parse.String("export interface").Token()
            from name in Name.Token()

            from extends_token in Parse.String("extends").Token().Optional()
            from extends in Name.Token().DelimitedBy(Parse.Char(',').Token()).Optional()

            from openBrace in Parse.Char('{').Token()
            from statements in PropertySignature
                                .Or<Node>(MethodSignature)
                                .Many()
                                .Optional()
            from closeBrace in Parse.Char('}').Token()
            select new InterfaceDeclaration
            {
                Name = new Identifier
                {
                    Comment = comment.GetOrDefault(),
                    Text = name
                },
                Statements = new List<Node>(statements.GetOrDefault())
            };

        public static Parser<Parameter> Parameter =
            from name in Name.Token()
            from nullable in Parse.Char('?').Optional()
            from colon in Parse.Char(':').Token()
                // FunctionType Params
            from open_bracket in Parse.Char('(').Token().Optional()
            from parameters in Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Where(x => open_bracket.IsDefined).Optional()
            from close_bracket in Parse.Char(')').Token().Where(x => open_bracket.IsDefined).Optional()
            from arrow in Parse.String("=>").Token().Where(x => open_bracket.IsDefined).Optional()

            from return_type in Type
            select new Parameter()
            {
                Name = new Identifier() { Text = name },
                Type = arrow.IsDefined ? new FunctionType() { Type = return_type, Parameters = parameters.IsDefined ? parameters.Get().ToList() : null } : return_type,
                QuestionToken = nullable.IsDefined ? new QuestionToken() : null,
            };

        /// <summary>
        /// myFunc(): void;
        /// myFunc(param: string): void;
        /// </summary>
        public static Parser<MethodSignature> MethodSignature =
            from comment in ParseComment().Optional()
            from name in Name.Token()
                from open_bracket in Parse.Char('(').Token()
                from parameters in Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Optional()
                from close_bracket in Parse.Char(')').Token()
            from colon2 in Parse.Char(':').Token()
            from type in Type
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

        /// <summary>
        /// name: string;
        /// name: (param: string) => void;
        /// </summary>
        public static Parser<PropertySignature> PropertySignature =
            from comment in ParseComment().Optional()
            from @readonly in Parse.String("readonly").Token().Optional()
            from name in Name.Token()
            from nullable in Parse.Char('?').Optional()
            from colon in Parse.Char(':').Token()

                // FunctionType Params
                from open_bracket in Parse.Char('(').Token().Optional()
                from parameters in Parameter.DelimitedBy(Parse.Char(',').Token()).Token().Where(x => open_bracket.IsDefined).Optional()
                from close_bracket in Parse.Char(')').Token().Where(x => open_bracket.IsDefined).Optional()
                from arrow in Parse.String("=>").Token().Where(x => open_bracket.IsDefined).Optional()

            from return_type in Type
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
                Modifiers = @readonly.IsDefined? new List<Node>() { new ReadonlyKeyword() } : null
            };


        public static Parser<Node> ArrayType =
            from name in Name
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
            from key_name in Name
            from colon in Parse.Char(':').Token()
            from key_type_name in Name
            from close_square_bracket in Parse.Char(']').Token()

            from colon2 in Parse.Char(':').Token()

            from return_name in Name

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
                                            .Or(Name.Select(x => new TypeReference() { TypeName = new Identifier() { Text = x } }));

        public static Parser<SourceFile> SourceFile =
            from nodes in InterfaceDeclaration
                .Or<Node>(ImportDeclaration)
                .Many()
                .Optional()
            select new SourceFile()
            {
                Statements = new List<Node>(nodes.GetOrDefault())
            };
    }
}
