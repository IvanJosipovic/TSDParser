using FluentAssertions;
using Sprache;

namespace TSDParser.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Interface()
        {
            var tsd = """
export interface SomeType {
  name: string;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Properties[0].Name.Should().Be("name");
            output.Properties[0].Type.Should().Be("string");
        }
    }
}