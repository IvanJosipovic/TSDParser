using TSDParser.Parsers;

namespace TSDParser.Tests
{
    public class ExportDeclarationTests
    {
        [Fact]
        public void Empty()
        {
            var tsd = """export { }""";
            var output = ExportParsers.ExportDeclaration.Parse(tsd);
            output.Kind.Should().Be(SyntaxKind.ExportDeclaration);

            output.ExportClause.Should().BeOfType<NamedExports>();
            output.ExportClause.As<NamedExports>().Kind.Should().Be(SyntaxKind.NamedExports);
        }

        [Fact]
        public void Single()
        {
            var tsd = """export { Class1 }""";
            var output = ExportParsers.ExportDeclaration.Parse(tsd);
            output.Kind.Should().Be(SyntaxKind.ExportDeclaration);

            output.ExportClause.Should().BeOfType<NamedExports>();
            output.ExportClause.As<NamedExports>().Kind.Should().Be(SyntaxKind.NamedExports);
            output.ExportClause.As<NamedExports>().Elements[0].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[0].Kind.Should().Be(SyntaxKind.ExportSpecifier);
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().Name.Text.Should().Be("Class1");
        }

        [Fact]
        public void Multiple()
        {
            var tsd = """export { Class1, Class2 }""";
            var output = ExportParsers.ExportDeclaration.Parse(tsd);

            output.ExportClause.Should().BeOfType<NamedExports>();
            output.ExportClause.As<NamedExports>().Elements[0].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().Name.Text.Should().Be("Class1");
            output.ExportClause.As<NamedExports>().Elements[1].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[1].As<ExportSpecifier>().Name.Text.Should().Be("Class2");
        }

        [Fact]
        public void Named()
        {
            var tsd = """export { Class1 as Class2 }""";
            var output = ExportParsers.ExportDeclaration.Parse(tsd);

            output.ExportClause.Should().BeOfType<NamedExports>();
            output.ExportClause.As<NamedExports>().Elements[0].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().Name.Text.Should().Be("Class2");
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().PropertyName.Text.Should().Be("Class1");
        }

        [Fact]
        public void NamedMultiple()
        {
            var tsd = """export { Class1 as Class2, Class3 as Class4 }""";
            var output = ExportParsers.ExportDeclaration.Parse(tsd);

            output.ExportClause.Should().BeOfType<NamedExports>();
            output.ExportClause.As<NamedExports>().Elements[0].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().Name.Text.Should().Be("Class2");
            output.ExportClause.As<NamedExports>().Elements[0].As<ExportSpecifier>().PropertyName.Text.Should().Be("Class1");
            output.ExportClause.As<NamedExports>().Elements[1].Should().BeOfType<ExportSpecifier>();
            output.ExportClause.As<NamedExports>().Elements[1].As<ExportSpecifier>().Name.Text.Should().Be("Class4");
            output.ExportClause.As<NamedExports>().Elements[1].As<ExportSpecifier>().PropertyName.Text.Should().Be("Class3");
        }
    }
}
