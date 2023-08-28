using FluentAssertions;
using Sprache;

namespace TSDParser.Tests
{
    public class UnitTest1
    {
        #region Interface
        [Fact]
        public void Interface()
        {
            var tsd = """
export interface SomeType {
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
        }

        [Fact]
        public void InterfaceExtends()
        {
            var tsd = """
export interface SomeType extends One, Two, Three {
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Extends[0].Should().Be("One");
            output.Extends[1].Should().Be("Two");
            output.Extends[2].Should().Be("Three");
        }

        [Fact]
        public void InterfaceExtendsNoSpace()
        {
            var tsd = """
export interface SomeType extends One,Two,Three {
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Extends[0].Should().Be("One");
            output.Extends[1].Should().Be("Two");
            output.Extends[2].Should().Be("Three");
        }

        [Fact]
        public void InterfaceProperty()
        {
            var tsd = """
export interface SomeType {
  name: string;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.Properties[0].Name.Should().Be("name");
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
            output.Properties[1].Name.Should().Be("name2");
            output.Properties.Count.Should().Be(2);
        }

        [Fact]
        public void InterfaceComments()
        {
            var tsd = """
/* Interface Comment */
export interface SomeType {
  name: string;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");
            output.CommentText.Should().Be("Interface Comment");
            output.Properties[0].Name.Should().Be("name");
            output.Properties[0].Type.Should().Be("string");
            output.Properties[0].IsArray.Should().BeFalse();
            output.Properties[0].IsNullable.Should().BeFalse();

            output.Properties.Count.Should().Be(1);
        }

        [Fact]
        public void InterfaceFunction()
        {
            var tsd = """
export interface SomeType {
  myFunc(): void;
}
""";
            var output = TSDParser.Interface.Parse(tsd);

            output.Name.Should().Be("SomeType");

            output.Functions[0].Name.Should().Be("myFunc");

            output.Functions.Count.Should().Be(1);
        }

        #endregion

        #region Functions

        [Fact]
        public void FunctionVoid()
        {
            var tsd = """
  myFunc(): void;
""";
            var output = TSDParser.Function.Parse(tsd);

            output.Name.Should().Be("myFunc");
            output.Type.Should().Be("void");
        }

        [Fact]
        public void FunctionVoidNoSpace()
        {
            var tsd = """
  myFunc():void;
""";
            var output = TSDParser.Function.Parse(tsd);

            output.Name.Should().Be("myFunc");
            output.Type.Should().Be("void");
        }

        [Fact]
        public void FunctionArrowVoid()
        {
            var tsd = """
  myFunc: () => void;
""";
            var output = TSDParser.Function.Parse(tsd);

            output.Name.Should().Be("myFunc");
            output.Type.Should().Be("void");
        }

        [Fact]
        public void FunctionArrowVoidNoSpace()
        {
            var tsd = """
  myFunc:()=>void;
""";
            var output = TSDParser.Function.Parse(tsd);

            output.Name.Should().Be("myFunc");
            output.Type.Should().Be("void");
        }

        #endregion

        #region Properties

        [Fact]
        public void Property()
        {
            var tsd = """
  name: string;
""";
            var output = TSDParser.Property.Parse(tsd);

            output.Name.Should().Be("name");
            output.Type.Should().Be("string");
        }

        [Fact]
        public void PropertyNoSpace()
        {
            var tsd = """
  name:string;
""";
            var output = TSDParser.Property.Parse(tsd);

            output.Name.Should().Be("name");
            output.Type.Should().Be("string");
        }

        [Fact]
        public void PropertyArray()
        {
            var tsd = """
  name: string[];
""";
            var output = TSDParser.Property.Parse(tsd);

            output.Name.Should().Be("name");
            output.Type.Should().Be("string");
            output.IsArray.Should().BeTrue();
            output.IsNullable.Should().BeFalse();
        }

        [Fact]
        public void PropertyComments()
        {
            var tsd = """
  /* Property Comment */
  name: string;
""";
            var output = TSDParser.Property.Parse(tsd);

            output.CommentText.Should().Be("Property Comment");
            output.Name.Should().Be("name");
            output.Type.Should().Be("string");
            output.IsArray.Should().BeFalse();
            output.IsNullable.Should().BeFalse();
        }

        [Fact]
        public void PropertyNullable()
        {
            var tsd = """
  name?: string;
""";
            var output = TSDParser.Property.Parse(tsd);

            output.Name.Should().Be("name");
            output.Type.Should().Be("string");
            output.IsArray.Should().BeFalse();
            output.IsNullable.Should().BeTrue();
        }

//        [Fact]
//        public void PropertyNullableUnion()
//        {
//            var tsd = """
//  name: string | null;
//""";
//            var output = TSDParser.Property.Parse(tsd);

//            output.Name.Should().Be("name");
//            output.Type.Should().Be("string");
//            output.IsArray.Should().BeFalse();
//            output.IsNullable.Should().BeTrue();
//        }

//        [Fact]
//        public void PropertyNullableUnion2()
//        {
//            var tsd = """
//  name: string | undefined;
//""";
//            var output = TSDParser.Property.Parse(tsd);

//            output.Name.Should().Be("name");
//            output.Type.Should().Be("string");
//            output.IsArray.Should().BeFalse();
//            output.IsNullable.Should().BeTrue();
//        }

        #endregion

        #region Comments

        [Fact]
        public void Comment()
        {
            var tsd = """
/* Comment */
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("Comment");
        }

        [Fact]
        public void Comment2()
        {
            var tsd = """
/*Comment*/
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("Comment");
        }

        [Fact]
        public void Comment3()
        {
            var tsd = """
/*
 Comment
 Comment2
*/
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("Comment\r\nComment2");
        }

        [Fact]
        public void Comment4()
        {
            var tsd = """
/**
* comment
*/
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("comment");
        }

        [Fact]
        public void Comment5()
        {
            var tsd = """
/*~ comment */
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("comment");
        }

        [Fact]
        public void Comment6()
        {
            var tsd = """
/*~ Comment1
*~ Comment2
*~ Comment3
*/
""";
            var output = TSDParser.ParseComment().Parse(tsd);

            output.Should().Be("Comment1\r\nComment2\r\nComment3");
        }

        #endregion
    }
}