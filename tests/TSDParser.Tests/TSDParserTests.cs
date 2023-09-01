namespace TSDParser.Tests
{
    public class TSDParserTests
    {
        [Fact]
        public void TestEmpty()
        {
            var parsed = TSDParser.ParseDefinition("");
            parsed.Statements.Count.Should().Be(0);
        }

        [Fact]
        public void Test1()
        {
            var parsed = TSDParser.ParseDefinition("export interface Test1 {}");
            parsed.Statements[0].Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
        }

        [Fact]
        public void TestFullTSD()
        {
            var parsed = TSDParser.ParseDefinition(File.ReadAllText("../../../../../samples/definitions/applicationinsights-web.d.ts"));
            parsed.Statements.Count(x => x.Kind == SyntaxKind.ImportDeclaration).Should().Be(67);
            parsed.Statements.Count(x => x.Kind == SyntaxKind.ExportDeclaration).Should().Be(56);
            parsed.Statements.Count(x => x.Kind == SyntaxKind.ClassDeclaration).Should().Be(2);
            parsed.Statements.Count(x => x.Kind == SyntaxKind.InterfaceDeclaration).Should().Be(2);
        }
    }
}
