namespace TSDParser.Parsers
{
    internal class ImportParsers
    {
        public static Parser<ImportSpecifier> ImportSpecifier =
            from className in CommonParsers.Name.Token()
            from keyword in Parse.String("as").Optional()
            from propertyName in CommonParsers.Name.Token().Where(x => keyword.IsDefined && x.Any()).Optional()
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
        public static Parser<ImportDeclaration> NamedImports =
            from keyword in Parse.String("import").Token()

            from open_bracket in Parse.Char('{').Token()
            from importSpecifiers in ImportSpecifier.DelimitedBy(Parse.Char(',').Token())
            from close_bracket in Parse.Char('}').Token()

            from keyword2 in Parse.String("from").Token()

            from package in Parse.AnyChar.Except(Parse.Chars("\'\"")).Many().Text().Token().Contained(Parse.Chars("\'\"").Token(), Parse.Chars("\'\"").Token())

            from semicolon in Parse.Char(';').Token().Optional()

            select new ImportDeclaration()
            {
                ImportClause = new ImportClause()
                {
                    NamedBindings = new List<Node>()
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
        /// import * as test from '@org/package';
        /// </summary>
        public static Parser<ImportDeclaration> NamespaceImport =
            from keyword in Parse.String("import").Token()
            from keyword2 in Parse.Char('*').Token()
            from keyword3 in Parse.String("as").Token()
            from name in CommonParsers.Name.Token()
            from keyword4 in Parse.String("from").Token()

            from package in Parse.AnyChar.Except(Parse.Chars("\'\"")).Many().Text().Token().Contained(Parse.Chars("\'\"").Token(), Parse.Chars("\'\"").Token())
            from semicolon in Parse.Char(';').Token().Optional()
            select new ImportDeclaration()
            {
                ImportClause = new ImportClause()
                {
                    NamedBindings = new List<Node>()
                    {
                        new NamespaceImport()
                        {
                            Name = new Identifier() { Text = name}
                        }
                    }
                },
                ModuleSpecifier = new StringLiteral()
                {
                    Text = package
                }
            };

        public static Parser<ImportDeclaration> ImportDeclaration = NamedImports.Or(NamespaceImport);
    }
}
