using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSDParser.Tests
{
    public class TSDParserTests
    {
        [Fact]
        public void Test1()
        {
            var parsed = TSDParser.ParseDefinition("export interface Test1 {}");
            parsed.Statements[0].Kind.Should().Be(SyntaxKind.InterfaceDeclaration);
        }
    }
}
