using TSDParser.Parsers;

namespace TSDParser.Tests
{
    public class Imports
    {
        [Fact]
        public void Import()
        {
            var tsd = """import { MyClass } from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("MyClass");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void Symbols()
        {
            var tsd = """import { _MyClass } from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("_MyClass");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void WildCard()
        {
            var tsd = """import * as test from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamespaceImport>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamespaceImport>().Name.Text.Should().Be("test");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void Quotes()
        {
            var tsd = """import { MyClass } from "@org/package";""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("MyClass");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void NoSemiColon()
        {
            var tsd = """
                import { MyClass } from "@org/package"
                """;
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("MyClass");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void MultiImport()
        {
            var tsd = """import { MyClass, MyClass2 } from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("MyClass");
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[1].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[1].As<ImportSpecifier>().Name.Text.Should().Be("MyClass2");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void As()
        {
            var tsd = """import { MyClass as NewClass } from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().PropertyName.Text.Should().Be("MyClass");
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("NewClass");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }

        [Fact]
        public void MultiAs()
        {
            var tsd = """import { MyClass as NewClass, MyClass2 as NewClass2 } from '@org/package';""";
            var output = ImportParsers.ImportDeclaration.Parse(tsd);

            output.ImportClause.Should().BeOfType<ImportClause>();

            output.ImportClause.As<ImportClause>().NamedBindings[0].Should().BeOfType<NamedImports>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().PropertyName.Text.Should().Be("MyClass");
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[0].As<ImportSpecifier>().Name.Text.Should().Be("NewClass");

            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[1].Should().BeOfType<ImportSpecifier>();
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[1].As<ImportSpecifier>().PropertyName.Text.Should().Be("MyClass2");
            output.ImportClause.As<ImportClause>().NamedBindings[0].As<NamedImports>().Elements[1].As<ImportSpecifier>().Name.Text.Should().Be("NewClass2");

            output.ModuleSpecifier.Text.Should().Be("@org/package");
        }
    }
}
