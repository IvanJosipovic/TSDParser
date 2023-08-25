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
            output.Properties[0].IsArray.Should().BeFalse();
            output.Properties[0].IsNullable.Should().BeFalse();

            output.Properties.Count.Should().Be(1);
        }

        [Fact]
        public void InterfaceMultiProperty()
        {
            var tsd = """
export interface SomeType {
  name: string;
  name2: string;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Properties[0].Name.Should().Be("name");
            output.Properties[0].Type.Should().Be("string");
            output.Properties[0].IsArray.Should().BeFalse();
            output.Properties[0].IsNullable.Should().BeFalse();

            output.Properties[1].Name.Should().Be("name2");
            output.Properties[1].Type.Should().Be("string");
            output.Properties[1].IsArray.Should().BeFalse();
            output.Properties[1].IsNullable.Should().BeFalse();

            output.Properties.Count.Should().Be(2);
        }

        [Fact]
        public void InterfaceNullableProperty()
        {
            var tsd = """
export interface SomeType {
  name?: string;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Properties[0].Name.Should().Be("name");
            output.Properties[0].Type.Should().Be("string");
            output.Properties[0].IsArray.Should().BeFalse();
            output.Properties[0].IsNullable.Should().BeTrue();

            output.Properties.Count.Should().Be(1);
        }

        [Fact]
        public void InterfaceArrayProperty()
        {
            var tsd = """
export interface SomeType {
  name: string[];
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Properties[0].Name.Should().Be("name");
            output.Properties[0].Type.Should().Be("string");
            output.Properties[0].IsArray.Should().BeTrue();
            output.Properties[0].IsNullable.Should().BeFalse();

            output.Properties.Count.Should().Be(1);
        }
    }
}