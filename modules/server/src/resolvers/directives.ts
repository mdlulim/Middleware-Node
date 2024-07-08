/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defaultFieldResolver,
  DirectiveNode,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputType,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  isNonNullType,
  isScalarType,
  ValueNode,
} from 'graphql';
import {fromGlobalId, toGlobalId} from 'graphql-relay';
import {SchemaDirectiveVisitor} from 'graphql-tools';

type Maybe<T> = null | undefined | T;

function findRelayIdDirective(
  directives?: ReadonlyArray<DirectiveNode>
): DirectiveNode | undefined {
  return directives?.find((d) => d.name.value === 'relayId');
}

function getTypeValue(node: DirectiveNode): string {
  if (node.arguments) {
    const value = node.arguments[0].value;

    if (value.kind === 'StringValue') {
      return value.value;
    } else {
      throw new Error(
        `Invalid Argument Value. Directive: ${node}, Value: ${value}`
      );
    }
  } else {
    throw new Error('Invalid Directive: ${node}, Missing arguments');
  }
}

const relayIdTypeMap = new Map<string, GraphQLScalarType>();

class RelayIdScalarType extends GraphQLScalarType {
  constructor(config: GraphQLScalarTypeConfig<any, any>, relayType: string) {
    super({
      ...config,
      name: `RelayId${relayType}`,
      parseLiteral: (
        valueNode: ValueNode,
        variables: Maybe<{[key: string]: any}>
      ) => {
        // TODO
        // eslint-disable-next-line
        const result = config.parseLiteral!(valueNode, variables);

        if (result) {
          const resolveId = fromGlobalId(result);

          if (resolveId.type !== relayType) {
            throw new Error(
              `Expected Global Type of ${relayType}, got: ${resolveId.type}`
            );
          }

          return resolveId.id;
        }

        return result;
      },
      parseValue: (value: any) => {
        debugger;
        // TODO
        // eslint-disable-next-line
        const result = config.parseValue!(value);

        if (result) {
          const resolveId = fromGlobalId(result);

          if (resolveId.type !== relayType) {
            throw new Error(
              `Expected Global Type of ${relayType}, got: ${resolveId.type}`
            );
          }

          return resolveId.id;
        }

        return result;
      },
    });
  }
}

export class RelayIdDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<unknown, unknown>) {
    const {resolve = defaultFieldResolver} = field;

    const directive = findRelayIdDirective(field.astNode?.directives);

    if (directive) {
      const relayType = getTypeValue(directive);
      field.resolve = async function (...args) {
        const result = await resolve.apply(this, args);

        return toGlobalId(relayType, result);
      };
    }
  }
  visitArgumentDefinition(argument: GraphQLArgument) {
    // TODO
    return argument;
  }
  visitInputFieldDefinition(inputField: GraphQLInputField) {
    let type = inputField.type;
    let isNonNull = false;

    if (isNonNullType(type)) {
      type = type.ofType;
      isNonNull = true;
    }

    if (isScalarType(type)) {
      const directive = findRelayIdDirective(inputField.astNode?.directives);

      if (directive) {
        const relayType = getTypeValue(directive);

        let wrappedScalar: GraphQLInputType;

        if (relayIdTypeMap.has(relayType)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          wrappedScalar = relayIdTypeMap.get(relayType)!;
        } else {
          wrappedScalar = new RelayIdScalarType(type.toConfig(), relayType);
          relayIdTypeMap.set(relayType, wrappedScalar);
        }

        if (isNonNull) {
          wrappedScalar = GraphQLNonNull(wrappedScalar);
        }

        inputField.type = wrappedScalar;
      }
    }

    return inputField;
  }
}
